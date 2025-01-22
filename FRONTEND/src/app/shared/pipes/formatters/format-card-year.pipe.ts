import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCardYear',
  standalone: false,
})

export class FormatCardYearPipe implements PipeTransform {
  transform(date: string | Date): string {
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
      const year = parsedDate.getFullYear();
      return year.toString();
    }
    return 'YYYY';
  }
}
