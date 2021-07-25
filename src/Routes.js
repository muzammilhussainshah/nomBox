import React, { Component } from 'react';
import { Scene, Router, } from 'react-native-router-flux'


import Splash from './container/Splashscreen'
import Login from './container/signIn'
import SignUp from './container/signup'
import ForgotPassword from './container/forgetYourPassword'
import Home from './container/home'
import AdminHome from './container/adminHome'
import PhoneVerification from './container/phoneVerification'
import CodeVerification from './container/codeVerification'
import EmailVerification from './container/EmailVerification'
import SocialRegistration from './container/socialRegistration'
import RoleScreen from './container/roleScreen'
import HomeSeller from './container/HomeSeller'
import AddMealPlan from './container/AddMealPlan'
import MealDescription from './container/MealDescription'
import OrderPickedUp from './container/orderPickedUp'
import OrderConsole from './container/orderConsole';
import MyPlans from './container/MyPlans';
import MyMeals from './container/MyMeals';
import AddMedia from './container/AddMedia';
import Camera from './Component/Camera';

import Cart from './container/Buyers/Cart';
import Payment from './container/Buyers/payment';
import PaymentCard from './container/Buyers/PaymentCard';
import NearbyMap from './container/Buyers/NearbyMap';
import Buyer from './container/Buyers/buyer';
import BuyerHome from './container/Buyers/BuyerHome';
import Post from './container/Buyers/Post';
import AnimatedMap from './container/Buyers/AnimatedMap';
import ChatScreen from './Component/ChatScreen'
import ChatList from './Component/ChatList'
import CustomCarousel from './container/Buyers/customCarousel';


class Route extends Component {
  render() {
    return (
      <Router>
        <Scene>
          <Scene key='CustomCarousel'  component={CustomCarousel} hideNavBar={true} />
          <Scene key='ChatList' component={ChatList} hideNavBar={true} />
          <Scene key='ChatScreen' component={ChatScreen} hideNavBar={true} />
          <Scene key='AnimatedMap' component={AnimatedMap} hideNavBar={true} />
          <Scene key='PaymentCard' component={PaymentCard} hideNavBar={true} />
          <Scene key='Payment' component={Payment} hideNavBar={true} />
          <Scene key='Post' component={Post} hideNavBar={true} />
          <Scene key='BuyerHome' component={BuyerHome} hideNavBar={true} />
          <Scene key='Buyer' component={Buyer} hideNavBar={true} />
          <Scene key='Cart' component={Cart} hideNavBar={true} />
          <Scene key='NearbyMap' component={NearbyMap} hideNavBar={true} />
          <Scene key='MyMeals' component={MyMeals} hideNavBar={true} />
          <Scene key='MyPlans' component={MyPlans} hideNavBar={true} />
          <Scene key='Camera' component={Camera} hideNavBar={true} />
          <Scene key='AddMedia' component={AddMedia} hideNavBar={true} />
          <Scene key='OrderConsole' component={OrderConsole} hideNavBar={true} />
          <Scene key='OrderPickedUp' component={OrderPickedUp} hideNavBar={true} />
          <Scene key='MealDescription' component={MealDescription} hideNavBar={true} />
          <Scene key='HomeSeller' component={HomeSeller} hideNavBar={true} />
          <Scene key='AddMealPlan' component={AddMealPlan} hideNavBar={true} />
          <Scene key='RoleScreen' component={RoleScreen} hideNavBar={true} />
          <Scene key='Splash' initial component={Splash} hideNavBar={true} />
          <Scene key='signIn' component={Login} hideNavBar={true} />
          <Scene key='signUp' component={SignUp} hideNavBar={true} />
          <Scene key='Home' component={Home} hideNavBar={true} />
          <Scene key='EmailVerification' component={EmailVerification} hideNavBar={true} />
          <Scene key='CodeVerification' component={CodeVerification} hideNavBar={true} />
          <Scene key='PhoneVerification' component={PhoneVerification} hideNavBar={true} />
          <Scene key='SocialRegistration' component={SocialRegistration} hideNavBar={true} />
          <Scene key='AdminHome' component={AdminHome} hideNavBar={true} />
          <Scene key='forGotPassword' component={ForgotPassword} hideNavBar={true} />
        </Scene>
      </Router>
    )
  }
}

export default Route