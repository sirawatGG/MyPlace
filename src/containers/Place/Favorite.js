import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Row from '../../components/Row';

// import {
//   NavBar,
//   Container,
// } from '../../components';

// import {
//   appActions,
// } from '../../redux/actions';

// @connect(
//   state => ({
//     authen: state.authen.get('authen'),
//     user: state.authen.getIn(['authen', 'user']),
//   }), {
//     ...appActions,
//   },
// )
export default class Favorite extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  // static defaultProps = {
  //   navigation: null,
  // }

  constructor() {
    super();
    this.state = {
    };
  }

  goMap = () => {
    this.props.navigator.push({ screen: 'MapView', title: 'Select Location' });
  }

  render() {
    return (
      <View>
        <Row onPress={this.goMap} />
      </View>
    );
  }
}
