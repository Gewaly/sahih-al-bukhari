import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HadithApiService } from '../../core/services/hadith-api.service';
import { ArabicNumberPipe } from '../../shared/pipes/arabic-number.pipe';
import { SECTIONS_AR } from '../../shared/translations/sections';
import { SearchService } from '../../core/services/search.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ArabicNumberPipe],
  templateUrl: './hadith-list.component.html',
  styleUrls: ['./hadith-list.component.scss']
})
export class HadithListComponent implements OnInit {
  hadiths: any[] = [];
  filteredHadiths: any[] = [];
  sectionId!: number;
  sectionTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private _apiHadithApiService: HadithApiService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.sectionId = +this.route.snapshot.paramMap.get('sectionId')!;
    this.sectionTitle = SECTIONS_AR[this.sectionId.toString()] || '';

    this._apiHadithApiService.getBook().subscribe(res => {
      this.hadiths = res.hadiths.filter(
        (h: any) => h.reference.book === this.sectionId
      );
      this.filteredHadiths = this.hadiths;

      if (!this.sectionTitle && res.metadata.sections[this.sectionId]) {
        this.sectionTitle = res.metadata.sections[this.sectionId];
      }

      this.searchService.search$.subscribe(term => {
        this.filterHadiths(term);
      });
    });
  }

  filterHadiths(term: string) {
    if (!term) {
      this.filteredHadiths = this.hadiths;
    } else {
      const normalizedTerm = this.searchService.normalizeArabic(term);
      this.filteredHadiths = this.hadiths.filter(h =>
        this.searchService.normalizeArabic(h.text).includes(normalizedTerm) ||
        h.hadithnumber.toString().includes(term)
      );
    }
  }
}
