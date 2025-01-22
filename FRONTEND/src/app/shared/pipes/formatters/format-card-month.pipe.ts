import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCardMonth',
  standalone: false,
})

export class FormatCardMonthPipe implements PipeTransform {
  transform(date: string | Date): string {
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
      const month = parsedDate.getMonth() + 1;
      return month.toString().padStart(2, '0');
    }
    return 'MM';
  }
}
