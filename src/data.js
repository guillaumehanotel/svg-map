import USA from "@svg-maps/usa.states-territories";
import World from "@svg-maps/world";
import FranceDepartments from "@svg-maps/france.departments";
import {slugify} from "./utils";

const maps = [USA, World, FranceDepartments]

export function getMaps() {
    return maps;
}

export function getMapBySlug(slug) {
    return maps.find(
        map => slugify(map.label) === slug
    )
}