import React, { Component }  from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

const nlp = require('compromise')
const Sentiment = require('sentiment');

const posList = [
    'I agree!',
    'Thats true!'
]

const negativeList = [
    'But ',
    'Well ',
    'Yeah right, ',
]

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            robotAnswer: '',
        };
    }

    onAsk() {
        const sentiment = new Sentiment();
        const result = sentiment.analyze(this.state.text);

        if (result.score <= 0) {
            const rand = Math.floor(Math.random() * posList.length)
            this.setState({
                robotAnswer: posList[rand]
            });

        } else {
            const rand = Math.floor(Math.random() * negativeList.length)
            const doc = nlp(this.state.text);
            const negative = doc.sentences().toNegative().out('text');
            this.setState({robotAnswer: negativeList[rand] + negative.toLowerCase() + '?'});
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TextInput
                    style={{
                        height: 100,
                        padding: 10,
                        fontSize: 30,
                        width: '80%'
                    }}
                    value={this.state.text}
                    onKeyPress={(evt) => {
                        if (evt.nativeEvent.key === 'Enter') {
                            this.onAsk();
                        }
                    }}
                    placeholder="What are you thinking"
                    onChangeText={(text) => this.setState({
                        text,
                        robotAnswer: '',
                    })}
                />
                <Button
                    style={{
                        flex: 1,
                    }}
                    onPress={() => this.onAsk()}
                    title="What does Grumpy Robot think?"
                    accessibilityLabel="Ask Grumpy Robot"
                />
                {!!this.state.robotAnswer &&
                    <View>
                        <Text style={{padding: 10, fontSize: 15}}>Grumpy robot thinks</Text>
                        <Text style={{padding: 10, fontSize: 30}}>{this.state.robotAnswer}</Text>
                    </View>
                }
            </View>
        );
    }
}
