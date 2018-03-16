package com.nfc.util;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by tangdi on 3/16/18.
 */

public class AppUpdate implements Parcelable{

    public int forceUpgrade;
    public int upgrade;
    public String upgradeLog;
    public String url;
    public String version;
    public int versionCode;

    protected AppUpdate(Parcel in) {
        forceUpgrade = in.readInt();
        upgrade = in.readInt();
        upgradeLog = in.readString();
        url = in.readString();
        version = in.readString();
        versionCode = in.readInt();
    }

    public AppUpdate(){}

    public static final Creator<AppUpdate> CREATOR = new Creator<AppUpdate>() {
        @Override
        public AppUpdate createFromParcel(Parcel in) {
            return new AppUpdate(in);
        }

        @Override
        public AppUpdate[] newArray(int size) {
            return new AppUpdate[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(forceUpgrade);
        dest.writeInt(upgrade);
        dest.writeString(upgradeLog);
        dest.writeString(url);
        dest.writeString(version);
        dest.writeInt(versionCode);
    }
}
