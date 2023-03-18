import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import {ImageConfig, NavigateTo} from '../../constants';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import AlbumCardComponent from '../../components/AlbumCardComponent';
import {localStorage} from '../../helpers';
import {useFocusEffect} from '@react-navigation/native';

const Header = ({name, onPress}) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerBackIconWrapper}
          onPress={onPress}>
          <Image source={ImageConfig.BackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>{name}</Text>
        <View />
      </View>
      <View style={styles.headerBottomLine} />
    </>
  );
};

const AlbumScreen = (props: any) => {
  const navigation = props.navigation;
  const {id} = props.route.params;

  const {name} = props.route.params;

  const [albumData, setAlbumData] = useState<[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>();

  const [viewMode, setViewMode] = useState<'album' | 'photo'>('album');

  const [photoAlbumData, setPhotoAlbumData] = useState<[]>();
  const [isphotoAlbumDataLoading, setIsphotoAlbumDataLoading] =
    useState<boolean>(true);
  const [isphotoAlbumDataLoaded, setIsphotoAlbumDataLoaded] =
    useState<boolean>();

  const [albumName, setAlbumName] = useState('Album');

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalURL, setModalURL] = useState<String>('');

  const getAlbumData = useCallback(() => {
    localStorage.setItem('Propacity', {
      screen: 'AlbumScreen',
      state: 'Album',
      AlbumId: id,
      name: name,
    });
    setIsLoading(true);
    setIsLoaded(false);
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      .then(response => response.json())
      .then((data: any) => {
        setAlbumData(data);
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setIsLoaded(false);
        console.error('error: ', error);
      });
  }, []);

  const getPhotoAlbumData = useCallback((idNew: any) => {
    localStorage.setItem('Propacity', {
      screen: 'AlbumScreen',
      state: 'Photo',
      PhotoId: idNew,
      name: name,
      AlbumId: id,
    });
    setIsphotoAlbumDataLoading(true);
    setIsphotoAlbumDataLoaded(false);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${idNew}`)
      .then(response => response.json())
      .then((data: any) => {
        setPhotoAlbumData(data);
        setIsphotoAlbumDataLoading(false);
        setIsphotoAlbumDataLoaded(true);
      })
      .catch((error: any) => {
        setIsphotoAlbumDataLoading(false);
        setIsphotoAlbumDataLoaded(false);
        console.error('error: ', error);
      });
  }, []);

  const chooseScreen = useCallback(async () => {
    const data: any = await localStorage.getItem('Propacity');
    if (data && typeof data === 'string') {
      const parsedData = JSON.parse(data);
      if (parsedData.state === 'Album') {
        getAlbumData();
        setViewMode('album');
      } else if (parsedData.state === 'Photo') {
        getAlbumData();
        getPhotoAlbumData(parsedData.PhotoId);
        setViewMode('photo');
      } else {
        getAlbumData();
        setViewMode('album');
      }
    } else {
      getAlbumData();
      setViewMode('album');
    }
  }, []);
  useEffect(() => {
    chooseScreen();
  }, [chooseScreen]);

  const imageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{uri: modalURL.toString()}}
              style={styles.modalImageStyle}
            />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.modalCloseImageStyle}>
              <Image
                source={ImageConfig.CloseIcon}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  let shouldGoBack = true;
  const onBackPress = useCallback(() => {
    navigation.replace(NavigateTo.DashboardScreen);

    return shouldGoBack;
  }, [navigation, shouldGoBack]);
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [onBackPress]),
  );

  return (
    <>
      {viewMode === 'album' && (
        <>
          {isLoading && <LoadingComponent />}
          {!isLoading && !isLoaded && <ErrorComponent />}
          {!isLoading && isLoaded && albumData && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              style={styles.container}
              keyboardShouldPersistTaps={'handled'}>
              <SafeAreaView>
                <Header
                  name={name}
                  onPress={() => {
                    navigation.navigate(NavigateTo.DashboardScreen);
                  }}
                />
                <View
                  style={{
                    marginHorizontal: '5%',
                  }}>
                  <Text style={styles.titleTextStyle}>Albums</Text>
                  <View style={styles.cardContainer}>
                    {albumData.map((item: any, index: any) => {
                      return (
                        <>
                          <AlbumCardComponent
                            title={item.title}
                            key={index}
                            isHorizontal={true}
                            onPress={() => {
                              setAlbumName(item.title);
                              setViewMode('photo');
                              getPhotoAlbumData(item.id);
                            }}
                          />
                        </>
                      );
                    })}
                  </View>
                </View>
              </SafeAreaView>
            </ScrollView>
          )}
        </>
      )}
      {viewMode === 'photo' && (
        <>
          {(isphotoAlbumDataLoading || isLoading) && <LoadingComponent />}
          {((!isphotoAlbumDataLoading && !isphotoAlbumDataLoaded) ||
            (!isLoading && !isLoaded)) && <ErrorComponent />}
          {!isphotoAlbumDataLoading &&
            isphotoAlbumDataLoaded &&
            !isLoading &&
            isLoaded &&
            photoAlbumData &&
            albumData && (
              <>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{}}
                  style={styles.container}
                  keyboardShouldPersistTaps={'handled'}>
                  <SafeAreaView>
                    <Header
                      name={name}
                      onPress={() => {
                        setAlbumName('Album');
                        setViewMode('album');
                        getAlbumData();
                      }}
                    />
                    {imageModal()}
                    <View style={styles.photoViewModeRowContainer}>
                      <View>
                        {albumData.map((item: any, index: any) => {
                          return (
                            <>
                              <AlbumCardComponent
                                title={item.title}
                                key={index}
                                onPress={() => {
                                  setAlbumName(item.title);
                                  getPhotoAlbumData(item.id);
                                }}
                                isVertical={true}
                              />
                            </>
                          );
                        })}
                      </View>
                      <View style={styles.verticalBar} />
                      <View
                        style={{
                          width: '60%',
                        }}>
                        <Text
                          style={[
                            styles.titleTextStyle,
                            {
                              marginBottom: 10,
                            },
                          ]}>
                          {albumName}
                        </Text>
                        <View style={styles.cardContainer}>
                          {photoAlbumData.map((item: any, index: any) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  setModalURL(item.url);
                                  setModalVisible(true);
                                }}
                                style={{
                                  height: 100,
                                  width: '50%',
                                }}>
                                <Image
                                  source={{uri: item.url}}
                                  style={{
                                    height: 100,
                                    width: '100%',
                                  }}
                                  resizeMethod="auto"
                                  resizeMode="cover"
                                />
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </SafeAreaView>
                </ScrollView>
              </>
            )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  titleTextStyle: {
    color: 'black',
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: 0.35,
  },
  photoViewModeRowContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  verticalBar: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  headerBackIconWrapper: {
    padding: 10,
  },
  headerTextStyle: {
    fontSize: 18,
    color: '#090A0A',
    fontWeight: '600',
  },
  headerBottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    marginTop: 10,
  },
  // ///////// modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {position: 'relative'},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalImageStyle: {
    height: 500,
    width: 300,
  },
  modalCloseImageStyle: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlbumScreen;
