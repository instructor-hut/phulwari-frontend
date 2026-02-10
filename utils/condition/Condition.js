import { Children } from "react";

export function Condition(props) {
    let when = null;
    let otherwise = null;

    Children.forEach(props.children, children => {
        if (children.props.isTrue === undefined) {
            otherwise = children;
        }
        else if (!when && children.props.isTrue === true) {
            when = children;
        }
    })

    return when || otherwise
}

Condition.When = ({ isTrue, children }) => isTrue && children;
Condition.Else = ({ render, children }) => render || children;