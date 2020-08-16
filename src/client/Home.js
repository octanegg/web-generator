import "./Home.scss";
import React from "react";
import { ExportPhoto } from "./util/photos";
import MatchTemplate from "./components/Templates/MatchStats/MatchTemplate";
import TopPerformers from "./components/Templates/TopPerformers/TopPerformersTemplate";
import TemplateSelector from "./components/TemplateSelector";

const MATCH_API_ENDPOINT = "https://api.octane.gg/api/zeebo/";
const TOPPERFORMERS_API_ENDPOINT = "https://api.octane.gg/api/zeebo-stats/";

const TEMPLATES = [{
    id: "asdf",
    name: "Octane Match Generator",
    type: "MATCH",
    photo: "/assets/MatchStatsTemplate.jpg",
    org: "Octane.gg",
    textColor: "white",
    orgPhoto: null,
    columnOrder: []
}, {
    id: "asdfasd",
    name: "Octane Top Performers",
    type: "TOPPERFORMERS",
    photo: "/assets/TopPerformersTemplate.jpg",
    org: "Octane.gg",
    textColor: "white",
    orgPhoto: null,
    columnOrder: []
}];

const INITIAL_STATE = { data: null, matchId: "", minGames: 0, currentTemplate: null, templates: TEMPLATES };

export default class HomeComponent extends React.PureComponent {
    state = INITIAL_STATE;

    render() {
        const { data, templates, currentTemplate, matchId, minGames } = this.state;
        const templateData = templates && templates.find(_ => _.id === currentTemplate);

        return <div className="home">
            <h1>Octane Match Generator</h1>
            <TemplateSelector templates={templates} onChange={this._updateCurrentTemplate} />
            {currentTemplate && <form className="input-form" onSubmit={this._handleSubmit}>
                <input type="text" placeholder="Match/Event ID" value={matchId} onChange={this._updateMatchId} />
                {templateData.type === "TOPPERFORMERS" && <input type="number" value={minGames} onChange={this._updateMinGames} />}
                <input type="submit" value="Go!" />
                {data && <input type="button" value="Export" onClick={() => ExportPhoto(this.state.matchId)} />}
            </form>}
            {data && <div className="display-area">
                {templateData.type === "MATCH" && <MatchTemplate data={data} {...templateData} />}
                {templateData.type === "TOPPERFORMERS" && <TopPerformers data={data} {...templateData} />}
            </div>}
        </div>;
    }

    _updateMatchId = (e) => this.setState({ matchId: e.target.value });
    _updateMinGames = (e) => this.setState({ minGames: e.target.value });
    _updateCurrentTemplate = (id) => this.setState({ ...INITIAL_STATE, currentTemplate: id });

    _handleSubmit = async (e) => {
        e.preventDefault();
        const { templates, matchId, minGames, currentTemplate } = this.state;

        const templateType = templates && templates.find(_ => _.id === currentTemplate)?.type;
        let templateApi;

        if (templateType === "MATCH") {
            templateApi = `${MATCH_API_ENDPOINT}${matchId}`;
        } else if (templateType === "TOPPERFORMERS") {
            templateApi = `${TOPPERFORMERS_API_ENDPOINT}${matchId}/${minGames}`;
        }

        const apiData = await (await fetch(templateApi)).json();

        this.setState({ data: apiData.data });
    }
}