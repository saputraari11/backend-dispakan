import { ValidationPipe } from '@nestjs/common';
export declare const REGEX: {
    PASSWORD_RULE: RegExp;
};
export declare const MESSAGES: {
    PASSWORD_RULE_MESSAGE: string;
};
export declare const SETTINGS: {
    VALIDATION_PIPE: ValidationPipe;
};
export declare const responseTemplate: (code: string, message: string, data: any, error?: boolean) => {
    error: boolean;
    alerts: {
        code: string;
        message: string;
    };
    data: any;
};
