<template>
  <div id="app">
    <b-navbar class="justify-content-center" type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/" exact-active-class="active"> Home </b-nav-item>
        <b-nav-item to="/location" exact-active-class="active"> Location Finder </b-nav-item>
        <b-nav-item to="/portfolio" exact-active-class="active"> Portfolio </b-nav-item>
        <b-nav-item to="/appointment" exact-active-class="active"> Book Appointment </b-nav-item>
        <b-nav-item to="/login" exact-active-class="active"> Login </b-nav-item>
        <b-nav-item to="/accountInfo" exact-active-class="active"> Account Info </b-nav-item>
        <b-nav-item to="/staff" exact-active-class="active"> Staff Page </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view class="container-xl p-2"/>
  </div>
</template>
