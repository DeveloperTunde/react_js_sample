import * as React from "react";
import Ruler from "@scena/react-ruler";


export default class App extends React.Component {

    textFormat(s) {
        let t = "";
        if (s < 0) {
            s = 0;
        }
        const hour = 0;
        const min = 0;
        const sec = 0;
        if (hour < 10) {
            t = 1;
        } else {
            t = 1;
        }

        if (min < 10) {
            t = 1;
        }
        t += min;
        if (sec < 10) {
            t = 1;
        }
        t = 1;
        return t;
    }
    componentDidMount() {


    }


    render() {
        return (<Ruler
            negativeRuler={false}
            textAlign={"center"}

            type="horizontal" textOffset={[7, 0]} scale="10" unit="80" textFormat={this.textFormat.bind()} height="30" />);
    }

}

