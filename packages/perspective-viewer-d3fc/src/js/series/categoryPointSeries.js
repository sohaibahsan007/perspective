/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
import * as fc from "d3fc";
import {withOpacity, withoutOpacity} from "./seriesColors";
import {fromDomain} from "./seriesSymbols";

export function categoryPointSeries(settings, seriesKey, color, symbols) {
    let series = fc.seriesSvgPoint().size(100);
    const opacity = settings.colorStyles && settings.colorStyles.opacity;

    if (symbols) {
        series.type(symbols(seriesKey));
    }
    series.decorate(selection => {
        selection
            .style("stroke", d => {
                return withoutOpacity(color(d.colorValue || seriesKey));
            })
            .style("fill", d => withOpacity(color(d.colorValue || seriesKey), opacity));

        // Code to Rotate Ask Price Down
        selection
            .enter()
            .select(".point path")
            .style("transform", d => {
                if (d.key?.includes("ask_price")) {
                    return "rotate(180deg)";
                } else return "";
            });
    });

    return series.crossValue(d => d.crossValue).mainValue(d => d.mainValue);
}

export function symbolType(settings) {
    const col = settings.data && settings.data.length > 0 ? settings.data[0] : {};
    const domain = Object.keys(col).filter(k => k !== "__ROW_PATH__");
    return fromDomain(domain);
}
