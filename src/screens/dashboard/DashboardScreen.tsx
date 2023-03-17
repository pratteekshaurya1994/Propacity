import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import CardComponent from '../../components/CardComponent';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import {PieChart} from 'react-native-svg-charts';

const DashboardScreen = (props: any) => {
  const navigation = props.navigation;

  const [peopleData, setPeopleData] = useState<[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>();

  const [totalAlbumCount, setTotalAlbumCount] = useState<[]>([]);
  const [totalAlbumColors, setTotalAlbumColors] = useState<[]>([]);
  const [userDetails, setuserDetails] = useState<[]>([]);

  const getPeople = useCallback(() => {
    setIsLoading(true);
    setIsLoaded(false);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data: any) => {
        setPeopleData(data);
        getPeopleAlbumData(data);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setIsLoaded(false);
        console.error('error: ', error);
      });
  }, []);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  const getPeopleAlbumData = useCallback((getPeopleData: any) => {
    setIsLoading(true);
    setIsLoaded(false);
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then((data: any) => {
        getChartData(data, getPeopleData);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setIsLoaded(false);
        console.error('error: ', error);
      });
  }, []);

  const getChartData = (data: any, getPeopleData: any) => {
    const result = data.reduce((acc: any, curr: any) => {
      const existing = acc.find((item: any) => item.userId === curr.userId);
      if (existing) {
        existing.totalCount++;
      } else {
        acc.push({userId: curr.userId, totalCount: 1});
      }
      return acc;
    }, []);
    const userDetails = result
      .map(({userId}) => {
        const user = getPeopleData.find(({id}) => id === userId);
        if (user) {
          return {id: user.id, name: user.name};
        }
      })
      .filter(Boolean);
    const totalAlbumCount = result.map(({totalCount}) => totalCount);
    const totalAlbumColors = totalAlbumCount.map(() => {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      return `#${randomColor}`;
    });

    setIsLoading(false);
    setIsLoaded(true);
    setTotalAlbumCount(totalAlbumCount);
    setTotalAlbumColors(totalAlbumColors);
    setuserDetails(userDetails);
  };

  const keys = [
    'key1',
    'key2',
    'key3',
    'key4',
    'key5',
    'key6',
    'key7',
    'key8',
    'key9',
    'key10',
  ];
  const colors = totalAlbumColors;
  const values = totalAlbumCount;
  const data = keys.map((key, index) => {
    return {
      key,
      value: values[index],
      svg: {fill: colors[index]},
      arc: {
        padAngle: 0,
      },
    };
  });

  return (
    <>
      {isLoading && <LoadingComponent />}
      {!isLoading && !isLoaded && <ErrorComponent />}
      {!isLoading && isLoaded && peopleData && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          style={styles.container}
          keyboardShouldPersistTaps={'handled'}>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Photos</Text>
            </View>
            <Text style={styles.contentTitle}>People</Text>
            {peopleData.map((item: any, index: any) => {
              return (
                <CardComponent
                  key={item.id}
                  name={item.name}
                  email={item.email}
                  companyName={item.company.name}
                  phoneNumber={item.phone}
                  lat={item.address.geo.lat}
                  lng={item.address.geo.lng}
                  albumCount={totalAlbumCount[index]}
                />
              );
            })}
            <>
              <View style={styles.chartHeader}>
                <Text style={styles.chartHeaderTitle}>People</Text>
              </View>
              <PieChart
                style={{height: 250}}
                outerRadius={'70%'}
                innerRadius={'55%'}
                data={data}
              />
              <View style={styles.chartContainer}>
                <View style={styles.chartWrapper}>
                  <View>
                    {totalAlbumColors.map((item: any, index: any) => {
                      return (
                        <View
                          key={index}
                          style={[
                            styles.chartTextStyle1,
                            {backgroundColor: item},
                          ]}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {userDetails.map((item: any, index: any) => {
                      return (
                        <Text key={index} style={styles.chartTextStyle2}>
                          {item.name}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {totalAlbumCount.map((item: any, index: any) => {
                      return (
                        <Text key={index} style={styles.chartTextStyle2}>
                          {item}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </View>
            </>
          </SafeAreaView>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  wrapper: {
    flex: 1,
    margin: 20,
  },
  header: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  },
  headerTitle: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 20,
  },
  chartHeader: {
    alignItems: 'center',
  },
  chartHeaderTitle: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
  },
  chartContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chartWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chartTextStyle1: {
    height: 20,
    width: 20,
    borderRadius: 100,
    marginRight: 10,
    marginVertical: 5,
  },
  chartTextStyle2: {
    color: 'gray',
    marginVertical: 5,
    lineHeight: 20,
  },
});

export default DashboardScreen;
