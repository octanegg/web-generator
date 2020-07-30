import "./Home.scss";
import React from "react";
import MatchTemplate from "./components/MatchTemplate";
import domToImage from "dom-to-image";

const API_ENDPOINT = "https://api.octane.gg/api/zeebo/";

export default class HomeComponent extends React.PureComponent {
    state = { data: null, matchId: "" };

    render() {
        const { data } = this.state;

        return <div className="home">
            <h1>Octane Match Generator</h1>
            <form className="input-form" onSubmit={this._handleSubmit}>
                <input type="text" placeholder="Match id" onChange={this._updateMatchId} />
                <input type="submit" value="Go!" />
                {data && <input type="button" value="Export" onClick={this._exportPhoto} />}
            </form>
            {data && <div className="display-area">
                <MatchTemplate data={data} />
            </div>}
        </div>;
    }

    _updateMatchId = (e) => this.setState({ matchId: e.target.value });

    _handleSubmit = async (e) => {
        e.preventDefault();

        const apiData = await (await fetch(API_ENDPOINT + this.state.matchId)).json();

        this.setState({ data: apiData.data });
    }

    _exportPhoto = async () => {
        let defaultPic = new Image();
        defaultPic.src = "/assets/DefaultTeamPic.png";
        defaultPic.onload = async (e) => {
            const canvas = document.createElement("canvas");
            canvas.height = defaultPic.height;
            canvas.width = defaultPic.width;
            canvas.style = { backgroundColor: "transparent" };
            const context = canvas.getContext("2d");
            context.drawImage(defaultPic, 0, 0);
            const photoArea = document.getElementById("photo-area");
            const scale = 1920 / photoArea.clientWidth;
            const blob = await domToImage.toJpeg(photoArea,
                {
                    imagePlaceholder: canvas.toDataURL("image/png"),
                    style: {
                        transform: 'scale(' + scale + ')',
                        transformOrigin: 'top left'
                    },
                    height: 1080,
                    width: 1920

                });
            let link = document.createElement('a');
            link.download = `${this.state.matchId}.jpg`;
            link.href = blob;
            link.click();
        }
    }
}