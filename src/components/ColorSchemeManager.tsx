import React, {useCallback, useEffect, useRef} from "react";
import {DataPacket, DataPacketType, UpdateColorSchemePacket} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";
import {Dictionary} from "../util/Dictionary";
import CefQueryService from "../service/CefQueryService";

export enum ColorScheme {
    LIGHT = "LIGHT",
    DARK = "DARK"
}

export enum ThemeVariables {
    default_bg = '--default-bg',
    dark_accent = '--dark-accent',
    dark_accent_50 = '--dark-accent-50',
    code_accent = '--code-accent',
    active = '--active',
    icon_color = '--icon-color',
    chat_color = '--chat-color',

    field_bg_disabled = '--field-bg-disabled',
    field_border_disabled = '--field-border-disabled',
    field_border = '--field-border',
    field_bg = '--field-bg',
    text_error = '--text-error',
    text_default = '--text-default',
    text_disabled = '--text-disabled',

    scrollbar_track = '--scrollbar-track',
    scrollbar_thumb = '--scrollbar-thumb',
}

const darkScheme: Dictionary<ThemeVariables, string> = {
    [ThemeVariables.default_bg]: 'rgb(43, 45, 48)',
    [ThemeVariables.dark_accent]: 'rgb(30, 31, 34)',
    [ThemeVariables.dark_accent_50]: 'rgb(30, 31, 34, .5)',
    [ThemeVariables.code_accent]: 'rgb(63, 66, 70)',
    [ThemeVariables.active]: 'rgba(53, 116, 240, 1)',
    [ThemeVariables.icon_color]: 'rgb(255, 255, 255)',
    [ThemeVariables.chat_color]: 'rgba(67, 69, 74, 1)',
    [ThemeVariables.field_bg_disabled]: 'rgba(60, 63, 65, 1)',
    [ThemeVariables.field_border_disabled]: 'rgba(100, 100, 100, 1)',
    [ThemeVariables.field_border]: 'rgb(78, 81, 87)',
    [ThemeVariables.field_bg]: 'rgba(76, 80, 82, 1)',
    [ThemeVariables.text_error]: 'rgba(255, 82, 97, 1)',
    [ThemeVariables.text_default]: 'rgba(187, 187, 187, 1)',
    [ThemeVariables.text_disabled]: 'rgba(119, 119, 119, 1)',
    [ThemeVariables.scrollbar_track]: 'rgba(255, 255, 255, 0.04)',
    [ThemeVariables.scrollbar_thumb]: 'rgba(255, 255, 255, 0.16)',
}

const lightScheme: Dictionary<ThemeVariables, string> = {
    [ThemeVariables.default_bg]: 'rgb(247, 248, 250)',
    [ThemeVariables.dark_accent]: 'rgb(237, 238, 242)',
    [ThemeVariables.dark_accent_50]: 'rgba(237, 238, 242, 0.5)',
    [ThemeVariables.code_accent]: 'rgb(192,188,188)',
    [ThemeVariables.active]: 'rgb(53, 116, 240)',
    [ThemeVariables.icon_color]: 'rgb(0, 0, 0)',
    [ThemeVariables.chat_color]: 'rgb(223, 225, 229)',
    [ThemeVariables.field_bg_disabled]: 'rgb(247, 248, 250)',
    [ThemeVariables.field_border_disabled]: 'rgb(223, 225, 229)',
    [ThemeVariables.field_border]: 'rgb(201, 204, 214)',
    [ThemeVariables.field_bg]: 'rgb(255, 255, 255)',
    [ThemeVariables.text_error]: 'rgb(199, 34, 45)',
    [ThemeVariables.text_default]: 'rgb(0, 0, 0)',
    [ThemeVariables.text_disabled]: 'rgb(140, 140, 140)',
    [ThemeVariables.scrollbar_track]: 'rgb(235, 236, 238)',
    [ThemeVariables.scrollbar_thumb]: 'rgb(202, 202, 204)',
}

const schemas: Dictionary<ColorScheme, Dictionary<ThemeVariables, string>> = {
    [ColorScheme.DARK]: darkScheme,
    [ColorScheme.LIGHT]: lightScheme
}

const ColorSchemeManager: React.FC = () => {
    const dataPacketService = useRef(DataPacketService.instance);
    const cefQueryService = useRef(CefQueryService.instance);

    const updateColorScheme = useCallback(
        (packet: DataPacket) => {
            const scheme = (packet as UpdateColorSchemePacket).scheme as ColorScheme
            const bodyStyles = document.body.style;
            Object.entries(schemas[scheme]).forEach(([key, value]) => {
                bodyStyles.setProperty(key, value);
            })
        },
        []
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_COLOR_SCHEME, (packet) => {updateColorScheme(packet)});
    }, [updateColorScheme]);

    useEffect(() => {
        cefQueryService.current.requestColorScheme()
    }, [])

    return (<>
    </>)
}

export default ColorSchemeManager