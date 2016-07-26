/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS,
  ScrollView,
  Image
} from 'react-native';


var Dimensions = require('Dimensions');
var {
  width
} = Dimensions.get('window');
// 引入计时器类库
var TimerMixin = require('react-timer-mixin');

// 引入json数据
var ImageData = require('./ImageData.json');

// class CViewDemo extends Component {
// ES5写法
var CViewDemo = React.createClass({
  // 注册计时器
  mixins: [TimerMixin],

  // 不可改变的值
  getDefaultProps() {
    return {
      age: 18,
      country: '中国',
      // 每隔多少时间
      duration: 1000
    }
  },

  // 可以改变的值
  getInitialState() {
    return {
      title: '不透明触摸',
      person: '张三',
      address: '苏州',
      // 当前的页码
      currentPage: 0
    }
  },

  render() {
    return (
      <View ref="topView" style={styles.container}>
          <TouchableOpacity
              activeOpacity={0.5}
              onPress={()=>this.activeEvent('点击')}
              onPressIn={()=>this.activeEvent('按下')}
              onPressOut={()=>this.activeEvent('抬起')}
              onLongPress={()=>this.activeEvent('长按')}
              >
            <View style={styles.innerViewStyle}>
              <Text ref="event">常用的事件</Text>
            </View>
          </TouchableOpacity>

          <View>
              <Text>{this.state.title}</Text>
              <Text>{this.state.person}</Text>
              <Text>{this.props.age}</Text>
              <Text backgroundColor='red'>{this.props.country}</Text>
              <Text backgroundColor='red'>{this.state.address}</Text>
          </View>

          <ScrollView
           ref="scrollView"
           horizontal={true}
           showsHorizontalScrollIndicator={false}
           pagingEnabled={true}
           // scrollEnabled={false}
           // 当一帧滚动结束
                 onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                 // 开始拖拽
                 onScrollBeginDrag={this.onScrollBeginDrag}
                 // 停止拖拽
                 onScrollEndDrag={this.onScrollEndDrag}
        >
         {this.renderChildView()} 
           </ScrollView>
            {/*返回指示器*/}
             <View style={styles.pageViewStyle}>
               {/*返回5个圆点*/}
               {this.renderPageCircle()}
             </View>
        </View>
    );
  },
  // 调用开始拖拽
  onScrollBeginDrag() {
    // 停止定时器
    this.clearInterval(this.timer);
  },

  // 调用停止拖拽
  onScrollEndDrag() {
    // 开启定时器
    this.startTimer();
  },
  // 实现一些复杂的操作
  componentDidMount() {
    // 开启定时器
    this.startTimer();
  },

  // 开启定时器
  startTimer() {
    // 1. 拿到scrollView
    var scrollView = this.refs.scrollView;
    var imgCount = ImageData.data.length;

    // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
    this.timer = this.setInterval(function() {
      // 2.1 设置圆点
      var activePage = 0;
      // 2.2 判断
      if ((this.state.currentPage + 1) >= imgCount) { // 越界
        activePage = 0;
      } else {
        activePage = this.state.currentPage + 1;
      }

      // 2.3 更新状态机
      this.setState({
        currentPage: activePage
      });

      // 2.4 让scrollView滚动起来
      var offsetX = activePage * width;
      scrollView.scrollResponderScrollTo({
        x: offsetX,
        y: 0,
        animated: true
      });
      scrollView

    }, this.props.duration);

  },

  renderChildView() {
    // 数组
    var allChild = [];
    var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    var imgsArr = ImageData.data;

    // 遍历
    for (var i = 0; i < imgsArr.length; i++) {
      var imgItem = imgsArr[i];
      allChild.push(
      <Image key={i} source={{uri: imgItem.img}} style={{width:width, height:120}}/>
      );
    }
    // 返回
    return allChild;
  },
  // 返回所有的圆点
  renderPageCircle() {
    // 定义一个数组放置所有的圆点
    var indicatorArr = [];
    var style;
    // 拿到图像数组
    var imgsArr = ImageData.data;
    // 遍历
    for (var i = 0; i < imgsArr.length; i++) {

      // 判断
      style = (i == this.state.currentPage) ? {
        color: 'orange'
      } : {
        color: '#ffffff'
      };

      // 把圆点装入数组
      indicatorArr.push(
        <Text key={i} style={[{fontSize:25},style]}>&bull;</Text>
      );
    }
    // 返回
    return indicatorArr;
  },

  //  当一帧滚动结束的时候调用
  onAnimationEnd(e) {
    // 1.求出水平方向的偏移量
    var offSetX = e.nativeEvent.contentOffset.x;

    // 2.求出当前的页数
    var currentPage = Math.floor(offSetX / width);
    // console.log(currentPage);

    // 3.更新状态机,重新绘制UI
    this.setState({
      // 当前的页码
      currentPage: currentPage
    });
  },
  activeEvent(event) {
    // 更新状态机
    this.setState({
      title: event,
      person: '李四',
      address: '无锡',
    })

    // 拿到View
    this.refs.topView
    this.refs.event
  }
});

// ES6写法
// class DTouchabelDemo extends Component {
//
// }

// class DTouchabelDemo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '不透明触摸',
//       person: '张三'
//     }
//   }
// }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 40,
  },

  innerViewStyle: {
    backgroundColor: 'red'
  },

  pageViewStyle: {
    width: width,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',

    // 定位
    position: 'absolute',
    bottom: 0,

    // 设置主轴的方向
    flexDirection: 'row',
    // 设置侧轴方向的对齐方式
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('CViewDemo', () => CViewDemo);