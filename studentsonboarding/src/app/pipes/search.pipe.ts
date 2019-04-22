import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/model/student';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(students: Student[], searchText: string): Student[] {
    //no student data
    if(!students) return [];
    
    //no search text
    if(!searchText) return students;
    
    //for searched results
    return students.filter( item => {
      return item.studentName.toLowerCase().includes(searchText.toLowerCase());
    });
   }

}
