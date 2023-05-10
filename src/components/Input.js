import React from "react";
import styled from "styled-components/native";
import { addHouse } from "../Action";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Component } from "react";
import { RadioButton } from "react-native-paper";
import { Pressable, Text } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const initialState = {
  division: "",
  money: 0,
  detail: "",
  kind: "",
  regDate: "",
  date: new Date(),
  visible: false,
};

const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #dddddd;
  flex-direction: row;
  height: 200px;
`;

const InputWrap = styled.View`
  flex: 1;
`;

const InputText = styled.TextInput`
  height: 40px;
  padding: 7px;
  border-color: #333;
  border: 1px solid #333333;
  flex: 1;
  margin-bottom: 5px;
`;

const Button = styled.View`
  width: 80px;
  height: 100px;
  background-color: gray;
  color: white;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 40px;
`;

const ButtonText = styled.Text`
  font-size: 25px;
`;

class Input extends Component {
  state = initialState;
  updateInput = (key, value) => {
    console.log(value);
    this.setState({
      ...this.state,
      [key]: value,
    });
  };
  addHouse = () => {
    this.props.dispatechAddHouse(this.state);
    this.setState(initialState);
  };
  onDate = () => {
    this.setState({ visible: true });
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  onConfirm = (selected) => {
    this.setState({ visible: false });
    this.updateInput("regDate", format(new Date(selected), "yy-MM-dd"));
  };

  render() {
    const { update, idx, houses } = this.props;
    return (
      <Container>
        <InputWrap>
          <RadioButton.Group
            onValueChange={(value) => this.updateInput("division", value)}
            value={this.state.division}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <RadioButton.Item
                label="수입"
                value="수입"
                style={{ height: 35 }}
              />
              <RadioButton.Item
                label="지출"
                value="지출"
                style={{ height: 35 }}
              />
            </View>
          </RadioButton.Group>
          <InputText
            placeholder="금액"
            value={this.state.money}
            onChangeText={(value) => this.updateInput("money", value)}
          />
          <InputText
            placeholder="내역"
            value={this.state.detail}
            onChangeText={(value) => this.updateInput("detail", value)}
          />
          <InputText
            placeholder="분류"
            value={this.state.kind}
            onChangeText={(value) => this.updateInput("kind", value)}
          />
          <Pressable onPress={this.onDate}>
            <Text>
              {format(new Date(this.state.date), "PPP", { locale: ko })}
            </Text>
          </Pressable>
        </InputWrap>
        <TouchableOpacity onPress={this.addHouse}>
          <Button>
            {console.log(update)}
            <ButtonText>{update === true ? "수정" : "등록"}</ButtonText>
          </Button>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={this.state.visible}
          mode={"date"}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          date={this.state.date}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  update: state.HouseReducer.update,
  idx: state.HouseReducer.idx,
  houses: state.HouseReducer.houses,
});

const mapDispatchToProps = {
  dispatechAddHouse: (house) => addHouse(house),
};
export default connect(mapStateToProps, mapDispatchToProps)(Input);
