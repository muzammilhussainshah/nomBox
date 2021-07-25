package com.cupopromo;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import android.app.Application;
import me.nereo.multi_image_selector.MultiImagePackage;
import com.facebook.react.ReactApplication;
import com.ninty.system.setting.SystemSettingPackage;
// import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import org.reactnative.camera.RNCameraPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
// import cl.json.RNSharePackage;
// import cl.json.ShareApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.airbnb.android.react.maps.MapsPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            // new PickerPackage(),
            new RNCameraPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseStoragePackage(),
            new FBSDKPackage(mCallbackManager),
            // new RNSharePackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new MultiImagePackage(),
            new RNGoogleSigninPackage(),
            new RNFirebaseDatabasePackage(),
            new MapsPackage(),
            new SystemSettingPackage(),
            new RNFirebaseFunctionsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  public String getFileProviderAuthority() {
    return "com.cupopromo.fileprovider";
}
}
