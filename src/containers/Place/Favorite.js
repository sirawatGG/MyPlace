import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FlatList,
} from 'react-native';

import actions from '../../redux/actions';
import Row from '../../components/Row';

@connect(state => ({
  favorite: Object.values(state.place.favorite),
}), {
  ...actions.placeActions,
})
export default class Favorite extends React.Component {
  static propTypes = {
    navigator:              PropTypes.object.isRequired,
    favorite:               PropTypes.array.isRequired,
    toggleFavoriteLocation: PropTypes.func.isRequired,
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
        data={this.props.favorite}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}
