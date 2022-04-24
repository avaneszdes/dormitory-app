import React from "react";
import {progressLineStyles} from "./HomeStyles";

interface Props {
    completed: number
    height: number
    text: string
    fontSize: string
    blockMaxWidth: number
    margin: number
}

export default function ProgressLine({margin,completed, text, height, fontSize, blockMaxWidth}: Props) {

    const style = {
        width: completed,
        fontSize: fontSize,
        height: height,
        blockMaxWidth: blockMaxWidth,
        margin: margin

    }
    const classes = progressLineStyles(style)

    return (
        <div className={classes.containerStyles}>
            <div className={classes.fillerStyles}>
                <span className={classes.labelStyles}>{`${text}`}</span>
            </div>
        </div>

    )
}
