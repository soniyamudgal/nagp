import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/model/student';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(students: Student[], filterAttr: string): Student[] {
    if(!students) return [];
    //for all students
    if(filterAttr.toLowerCase() == 'all') return students;

    //for indian students
    else if(filterAttr.toLowerCase() == 'indian'){
      return students.filter( item => {
        return item.category.toLowerCase() == 'indian';
      });
    }
    
    //for international students
    else{
      return students.filter( item => {
        return item.category.toLowerCase() == 'international';
      });
    }
   }

}
