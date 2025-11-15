import { ValidationError } from 'class-validator'

export function findErrorConstraints(errors?: ValidationError[]): string[] {
    if (!Array.isArray(errors)) {
        return ['Invalid request body or missing data']
    }

    return errors.flatMap((error) => {
        if (error.constraints) {
            return Object.values(error.constraints)
        }

        if (error.children && error.children.length > 0) {
            return findErrorConstraints(error.children)
        }

        return []
    })
}
