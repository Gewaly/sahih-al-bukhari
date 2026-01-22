import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HadithApiService } from '../../core/services/hadith-api.service';
import { SECTIONS_AR } from '../../shared/translations/sections';
import { ArabicNumberPipe } from '../../shared/pipes/arabic-number.pipe';

import { SearchService } from '../../core/services/search.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ArabicNumberPipe, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sections: { id: string; name: string; first?: number; last?: number }[] = [];
  filteredSections: { id: string; name: string; first?: number; last?: number }[] = [];
  isLoading: boolean = true;

  constructor(
    private hadithService: HadithApiService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.hadithService.getBook().subscribe({
      next: (res) => {
        const sections = res.metadata.sections;
        const sectionDetails = res.metadata.section_details;

        this.sections = Object.keys(sections)
          .filter(id => sections[id])
          .map(id => ({
            id,
            name: SECTIONS_AR[id] || sections[id],
            first: sectionDetails[id]?.hadithnumber_first,
            last: sectionDetails[id]?.hadithnumber_last
          }));

        this.filteredSections = this.sections;

        this.searchService.search$.subscribe(term => {
          this.filterSections(term);
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterSections(term: string) {
    if (!term) {
      this.filteredSections = this.sections;
    } else {
      const normalizedTerm = this.searchService.normalizeArabic(term);
      this.filteredSections = this.sections.filter(s =>
        this.searchService.normalizeArabic(s.name).includes(normalizedTerm) ||
        s.id.includes(term)
      );
    }
  }
}
