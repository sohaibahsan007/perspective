/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
import * as d3 from "d3";

const symbols = [d3.symbolTriangle];

export function fromDomain(domain) {
    return domain.length > 1
        ? d3
              .scaleOrdinal()
              .domain(domain)
              .range(symbols, function(d) {
                  console.log(d);
              })
        : null;
}
