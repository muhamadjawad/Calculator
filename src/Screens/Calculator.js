import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  COLOR_RED,
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_LIGHT_PRIMARY,
  DULL_BLACK,
} from '../styles/themeConstants';
import {width} from 'react-native-dimension';
import {Icon, Input} from 'native-base';

const Calculator = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(0);
  const scrollViewRef = useRef();

  const queryDictionary = {
    division: () => {
      setQuery(prevState => prevState.concat('/'));
    },
    x: () => {
      setQuery(prevState => prevState.concat('*'));
    },
    minus: () => {
      setQuery(prevState => prevState.concat('-'));
    },
    plus: () => {
      setQuery(prevState => prevState.concat('+'));
    },
    exponent: () => {
      setQuery(prevState => prevState.concat('**'));
    },
    equal: () => {
      setQuery(prevState => String(eval(prevState)));
      setResult(0);
    },
    'dot-single': () => {
      setQuery(prevState => prevState.concat('.'));
    },
    'percent-outline': () => {
      setQuery(prevState => prevState.concat('%'));
    },
    trash: () => {
      setQuery('');
    },
    backspace: () => {
      setQuery(prevState => prevState.slice(0, -1));
    },
  };

  // const doSomeWork = item => {
  //   console.log('Item', item);
  //   setLoading(true);
  //   value = item;

  //   // value.concat(item);
  //   setLoading({loading: null});
  // };
  const Numbers = props => {
    return (
      <View
        style={{
          flex: 1 / 3,
          alignSelf: 'center',
          backgroundColor: DULL_BLACK,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          delayPressOut={200}
          onPress={() => {
            // current =9
            // previous =3+
            // so concate current and prevous then send to previous

            setQuery(prevState => prevState.concat(props.num));
          }}
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: width(9),
              color: COLOR_WHITE,
              fontFamily: 'FFF_Tusj',
            }}>
            {props.num}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Signs = props => {
    return (
      <View
        style={[
          {
            flex: 1 / 5,
            backgroundColor: COLOR_LIGHT_PRIMARY,
          },
          props.style,
        ]}>
        <TouchableOpacity
          delayPressOut={200}
          onPress={queryDictionary[props.name]}
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Icon
            type={props.type}
            name={props.name}
            style={{
              color:
                props.iconColor === undefined ? COLOR_PRIMARY : props.iconColor,
              fontSize: width(8),
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const showResult = () => {
    if (query !== '') {
      try {
        return eval(query);
      } catch (error) {
        try {
          return eval(query.slice(0, -1));
        } catch (error) {
          return eval(query.slice(0, -2));
        }
      }
    } else {
      return 0;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR_WHITE}}>
      {/* //display */}
      <View style={{flex: 0.3, backgroundColor: COLOR_LIGHT_PRIMARY}}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: COLOR_LIGHT_PRIMARY,
            paddingHorizontal: width(2),
          }}>
          <ScrollView
            ref={scrollViewRef} //To reach bottom
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }
            contentContainerStyle={{
              alignItems: 'center',
            }}
            horizontal={true}>
            <Text
              style={{
                color: COLOR_WHITE,
                fontFamily: 'JosefinSans-Regular',
                fontSize: width(9),
              }}>
              {query}
            </Text>
            {/* <TextInput
              showSoftInputOnFocus={false}
              value={current}
              style={{
                color: COLOR_WHITE,
                fontFamily: 'JosefinSans-Regular',
                fontSize: width(9),
              }}
            /> */}
          </ScrollView>
        </View>
        <View
          style={{flex: 0.5, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Text
            style={{
              color: COLOR_PRIMARY,
              fontSize: width(13),
              fontFamily: 'ostrich-regular',
              marginRight: width(2),
            }}>
            {showResult()}
          </Text>
        </View>
      </View>
      {/* //numbers and + - */}
      <View
        style={{
          flex: 0.7,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderTopColor: COLOR_PRIMARY,
            borderTopWidth: width(0.3),
          }}>
          {/* Numbers */}
          <View style={{flex: 0.76, backgroundColor: COLOR_PRIMARY}}>
            <View
              style={{
                flex: 1 / 5,

                elevation: 5,
                flexDirection: 'row',
              }}>
              <Signs
                type={'FontAwesome5'}
                name={'backspace'}
                style={{flex: 1 / 3}}
              />
              <Signs
                type={'Entypo'}
                name={'trash'}
                style={{flex: 1 / 3}}
                iconColor={COLOR_RED}
              />
              <Signs
                type={'MaterialCommunityIcons'}
                name={'percent-outline'}
                style={{flex: 1 / 3}}
              />
            </View>
            <View
              style={{
                flex: 1 / 5,

                elevation: 5,
                flexDirection: 'row',
              }}>
              <Numbers num={7} />
              <Numbers num={8} />
              <Numbers num={9} />
            </View>
            <View
              style={{
                flex: 1 / 5,

                elevation: 5,
                flexDirection: 'row',
              }}>
              <Numbers num={4} />
              <Numbers num={5} />
              <Numbers num={6} />
            </View>
            <View
              style={{
                flex: 1 / 5,

                elevation: 5,
                flexDirection: 'row',
              }}>
              <Numbers num={1} />
              <Numbers num={2} />
              <Numbers num={3} />
            </View>
            <View
              style={{
                flex: 1 / 5,

                elevation: 5,
                flexDirection: 'row',
              }}>
              <Signs
                type={'Entypo'}
                name={'dot-single'}
                style={{flex: 1 / 3, backgroundColor: DULL_BLACK}}
              />
              <Numbers num={0} />
              <Signs
                type={'MaterialCommunityIcons'}
                name={'equal'}
                iconColor={COLOR_PRIMARY}
                style={{
                  flex: 1 / 3,
                  backgroundColor: DULL_BLACK,
                }}
              />
            </View>
          </View>
          {/* Signs */}
          <View style={{flex: 0.24, backgroundColor: DULL_BLACK}}>
            {/* <Numbers num={'/'} /> */}
            <Signs type={'MaterialCommunityIcons'} name={'division'} />
            <Signs type={'Octicons'} name={'x'} />
            <Signs type={'Entypo'} name={'minus'} />
            <Signs type={'Entypo'} name={'plus'} />
            <Signs type={'MaterialCommunityIcons'} name={'exponent'} />

            {/* <Numbers num={'x'} />
            <Numbers num={'-'} />
            <Numbers num={'+'} />
            <Numbers num={'='} /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Calculator;
