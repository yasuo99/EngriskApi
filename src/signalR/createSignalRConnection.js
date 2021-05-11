import { HttpTransportType, LogLevel } from "@microsoft/signalr";
import * as signalR from '@microsoft/signalr';
export const connection = new signalR.HubConnectionBuilder()
.configureLogging(LogLevel.Debug)
.withUrl('http://localhost:5000/notification', {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    accessTokenFactory: () => localStorage.getItem("token") || null
})
.build();