import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';
export interface CardComponentProps {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  albumCount: string;
  lat?: string;
  lng?: string;
}

const CardComponent = (props: CardComponentProps) => {
  const {name, email, phoneNumber, companyName, lat, lng, albumCount} = props;

  const openGoogleMap = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = companyName;

    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    if (typeof url === 'string') {
      Linking.openURL(url);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.emailPhoneWrapper}>
        <Text style={styles.emailPhoneText}>{email}</Text>
        <Text style={styles.emailPhoneText}>{phoneNumber}</Text>
      </View>
      <View style={styles.horizontalRow} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => {
            openGoogleMap();
          }}>
          <Text
            style={[
              styles.commonText,
              {
                textDecorationLine: 'underline',
              },
            ]}>
            {companyName}
          </Text>
        </TouchableOpacity>
        <Text style={styles.commonText}>{albumCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#DEDEDE',
    borderWidth: 1.16,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    elevation: 1,
  },
  nameText: {
    color: '#44444F',
    fontSize: 22,
    fontWeight: '700',
  },
  emailPhoneWrapper: {
    marginVertical: 10,
  },
  emailPhoneText: {
    color: '#696974',
    fontSize: 16,
    fontWeight: '500',
  },
  horizontalRow: {
    backgroundColor: '#DEDEDE',
    height: 1.16,
    width: '100%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  commonText: {
    color: '#696974',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CardComponent;
