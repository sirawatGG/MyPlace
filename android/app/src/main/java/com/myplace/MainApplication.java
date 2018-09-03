package com.myplace;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;
import com.airbnb.android.react.maps.MapsPackage;

public class MainApplication extends NavigationApplication{

    @Override
    public boolean isDebug() {
      return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MapsPackage()
      );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
    }

}
