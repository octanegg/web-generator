import "./MatchStatsTable.scss";

import React from "react";
import numeral from "numeral";

export default class MatchStatsTable extends React.PureComponent {

    componentWillMount() {
        this.setState({ columnOrder: Object.keys(this.props.team1[0]) });
    }

    state = {
        columnOrder: null,
        removedColumns: []
    }

    render() {
        const { team1, team2, teamSize } = this.props;
        const { columnOrder, removedColumns } = this.state;

        const filteredColumns = columnOrder.filter(_ => _ !== "Team" && !removedColumns.some(col => col === _));
        const sortedTeam1 = team1.sort(this._sortPlayerByRating);
        const sortedTeam2 = team2.sort(this._sortPlayerByRating);

        return <table className="table match-data-table">
            <thead>
                <tr>{filteredColumns.map(columnName => <td key={columnName}>{columnName}</td>)}</tr>
            </thead>
            <tbody>
                {sortedTeam1.map((playerData, i) =>
                    <tr key={`1-${i}`}>{filteredColumns.map((field, j) =>
                        <td key={j}>{!isNaN(playerData[field]) ? this._numberFormatter(field, playerData[field]) : playerData[field]}</td>)}
                    </tr>)}
                <tr key="sep" className="seperator"></tr>
                {sortedTeam2.map((playerData, i) =>
                    <tr key={`2-${i}`}>{filteredColumns.map((field, j) =>
                        <td key={j}>{!isNaN(playerData[field]) ? this._numberFormatter(field, playerData[field]) : playerData[field]}</td>)}
                    </tr>)}
            </tbody>
        </table>;
    }

    _sortPlayerByRating = (a, b) => b.Rating - a.Rating;

    _numberFormatter(key, value) {
        switch (key) {
            case "SHP":
            case "GP":
                return numeral(value).format("0.00%");
            default:
                return numeral(value).format("0.00");
        }
    }
}