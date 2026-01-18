import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private searchSubject = new BehaviorSubject<string>('');
    search$ = this.searchSubject.asObservable();

    setSearchTerm(term: string) {
        this.searchSubject.next(term);
    }

    normalizeArabic(text: string): string {
        if (!text) return '';
        return text
            .replace(/[\u064B-\u065F]/g, '') // Remove tashkeel
            .replace(/[أإآ]/g, 'ا') // Normalize Alef
            .replace(/ة/g, 'ه') // Normalize Ta Marbuta
            .replace(/ى/g, 'ي'); // Normalize Ya
    }
}
