import { PropertyService } from 'app/services/property.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyDto } from 'app/api-clients/general-client';
import { DomSanitizer } from '@angular/platform-browser';
// import { SwiperComponent } from "swiper/angular";
@Component({
  selector: 'app-detail-property',
  templateUrl: './detail-property.component.html',
  styleUrls: ['./detail-property.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class DetailPropertyComponent implements OnInit {
  images: any;
  id: any;
  property: PropertyDto;
  imageJson: any;
  myProperty: boolean = false;
  leasing: boolean = false;
  mapUrl: any;
  videoUrl: any;
  description: any;
  accompany: any = [
    { title: 'Parking/Garage' },
    { title: 'Balcony/Iterace' },
    { title: 'Porter/security' },
    { title: 'Parking/Garage' },
    { title: 'Balcony/Iterace' },
  ];

  constructor(
    private propertyService: PropertyService,
    private _activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    this.myProperty = !!this._activatedRoute.snapshot.queryParamMap.get('myProperty');
    this.leasing = !!this._activatedRoute.snapshot.queryParamMap.get('leasing');

    if (this.id) {
      if (this.myProperty) {
        this.propertyService.getMyPropertyById(this.id).subscribe((res) => {
          if (res) {
            this.property = res;
            this.mapUrl = this.sanitizer.bypassSecurityTrustHtml(this.property.mapLink);
            this.videoUrl = this.sanitizer.bypassSecurityTrustHtml(this.property.videoLink);
            this.description = this.sanitizer.bypassSecurityTrustHtml(this.property.descriptions);
            this.images = res.listPropertyImage;
          }
        });
      }
      if (this.leasing) {
        this.propertyService.getLeasingPropertyById(this.id).subscribe((res) => {
          this.property = res;
          this.mapUrl = this.sanitizer.bypassSecurityTrustHtml(this.property.mapLink);
          this.videoUrl = this.sanitizer.bypassSecurityTrustHtml(this.property.videoLink);
          this.description = this.sanitizer.bypassSecurityTrustHtml(this.property.descriptions);
          this.images = res.listPropertyImage;
        });
      }
    }
  }
}
