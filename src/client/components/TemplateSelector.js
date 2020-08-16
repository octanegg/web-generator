import "./TemplateSelector.scss";

import React from "react";
import classnames from "classnames";

export default class TemplateSelector extends React.PureComponent {

    state = { selected: null };

    render() {
        const { templates } = this.props;
        const { selected } = this.state;

        return <div className="template-selector">
            {templates && templates.map((template) => {
                const templateClasses = classnames("template", { selected: selected === template.id });
                return <div className={templateClasses} key={template.id} style={{ backgroundImage: `url(${template.photo})` }} onClick={() => this._onTemplateClick(template.id)}>
                    {template.name}
                </div>
            })}
        </div>
    }

    _onTemplateClick = (templateId) => { this.setState({ selected: templateId }); this.props.onChange(templateId) };
}