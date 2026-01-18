import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arabicNumber',
    standalone: true
})
export class ArabicNumberPipe implements PipeTransform {
    private arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    transform(value: number | string, length: number = 0): string {
        if (value == null) return '';
        let str = value.toString();
        if (length > 0) {
            str = str.padStart(length, '0');
        }
        return str.split('').map(char => {
            if (/\d/.test(char)) {
                return this.arabicDigits[+char];
            }
            return char;
        }).join('');
    }
}
