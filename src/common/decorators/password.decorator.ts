import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions } from "class-validator";

export function ConfirmdPasswordd(paraperty:string,validationOption?:ValidatorOptions){

  return(object:any,propertyName:string)=>{
    registerDecorator({
      target: object.constructor,
      propertyName,
      options:validationOption,
      constraints:[paraperty],
      validator:ConfirmPasswordConstraint ,
      
    })

  }

 

}
@ValidatorConstraint({name:"confirmdPassword",async:false})
export class ConfirmPasswordConstraint implements ValidatorConstraintInterface{
  validate(value: any, arg?: ValidationArguments) {
    const{object,constraints}=arg;
    const [paraperty]=constraints;
    const rellatedValue=object[paraperty]
    return value === rellatedValue


    
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return "password and confirmpassword shuled be equals"
  }
  
}