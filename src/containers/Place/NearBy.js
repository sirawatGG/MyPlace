import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FlatList,
} from 'react-native';

import Row from '../../components/Row';
import actions from '../../redux/actions';

const mapWhite = require('../../assets/icon_pin_white.png');

@connect(state => ({
  nearby: Object.values(state.place.nearby),
}), {
  ...actions.placeActions,
})
export default class NearBy extends React.Component {
  static propTypes = {
    navigator:              PropTypes.object.isRequired,
    nearby:                 PropTypes.array.isRequired,
    toggleFavoriteLocation: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    props.navigator.setButtons({
      fab: {
        collapsedId:     'MapView',
        collapsedIcon:   mapWhite,
        backgroundColor: '#00BBD6',
      },
      animated: true,
    });
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      switch (event.id) {
        case 'MapView':
          this.props.navigator.push({ screen: 'MapView', title: 'Select Location' });
          break;
        default: break;
      }
    }
  }

  goMap = () => {
    this.props.navigator.push({ screen: 'MapView', title: 'Select Location' });
  }

  toggleFavoriteLocation = (item) => {
    this.props.toggleFavoriteLocation(item.id, !item.fav);
  }

  renderItem = ({ item }) => (
    <Row onPress={() => this.toggleFavoriteLocation(item)} data={item} />
  )

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.props.nearby}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}
