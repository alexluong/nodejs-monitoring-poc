import { map, pipe, switchMap } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export function validateResponse<T>(classType: ClassConstructor<T>) {
  return pipe(
    map((response) => plainToInstance(classType, response)),
    switchMap(async (dto) => {
      await validateOrReject(dto as object);
      return dto;
    }),
  );
}
