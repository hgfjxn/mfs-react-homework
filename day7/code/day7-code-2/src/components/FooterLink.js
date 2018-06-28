import React from "react"
import classnames from "classnames"
import { connect } from "react-redux"
import {setVisibleFilter} from "../actions"

export class Link extends React.Component {
    render() {
        const { active, setFilter, children } = this.props
        return (
            <a className={classnames({ selected: active })}
                style={{ "cursor": "point" }}
                onClick={() => setFilter()}>
                {children}
            </a >
        )
    }
}

const mapStateToProps = (state, ownProps) => ({ 
    active: ownProps.filter === state.visibleFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setFilter: () => {dispatch(setVisibleFilter(ownProps.filter))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)
