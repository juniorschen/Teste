import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import * as decodePolyline from "decode-google-map-polyline";
import { MapView, Marker, Position, Polyline } from "nativescript-google-maps-sdk";
import { Color } from "@nativescript/core";
import { registerElement } from "@nativescript/angular";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;
    private mapView: MapView;
    bug: Array<{ lat: number, lng: number }> = decodePolyline("tifzCtgwkHeCnCuDnAkIk\bCkAD[MgA");

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    public async onMapReady(event) {
        this.mapView = event.object;
        this.mapView.zoom = 14;
        this.setCurrentLocation({ latitude: this.bug[0].lat, longitude: this.bug[0].lng })
    };

    private drawPolyline(latitude: number, longitude: number) {
        const currentPolyline = new Polyline();
        currentPolyline.color = new Color('#DD00b3fd');
        currentPolyline.visible = true;
        currentPolyline.geodesic = true;
        currentPolyline.width = 8;
        currentPolyline.addPoint(Position.positionFromLatLng(latitude, longitude));
        this.mapView.addPolyline(currentPolyline);
    }

    private setCurrentLocation(currentLocation: { latitude: number, longitude: number }) {
        this.mapView.latitude = currentLocation.latitude;
        this.mapView.longitude = currentLocation.longitude;
    }

    public async drawwwwww() {
        this.bug.forEach((res, index) => {
            this.drawPolyline(res.lat, res.lng);
        });
    }
}
