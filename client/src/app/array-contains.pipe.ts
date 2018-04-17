import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayContains'
})
/** used for angular to check if a course's students (array or null) contains student_id, so that we can show/hide register button */
/** course.students | arrayContains */
export class ArrayContainsPipe implements PipeTransform {
  transform(array: any, element?: string): boolean {
    // check if args is undefined
    if(element === undefined) return false;
    if(array === undefined || !array) return false;
    if(array instanceof Array){
      for(var i=0, len=array.length; i<len; i++){
        if(array[i] == element){
          return true;
        }
      }
    }else{
      return false;
    }
  }
}
