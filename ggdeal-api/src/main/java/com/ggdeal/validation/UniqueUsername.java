package com.ggdeal.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueUsernameValidator .class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {
    String message() default "El nombre ya esta registrado.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
