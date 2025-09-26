## Nestjs overview blog

- Modules: UserModule, PostModule, AuthModule.
- Dependency Injection: AuthModule injects UserModule to access user data for authentication.
- Controllers & Services: Handle CRUD operations for posts and users.
- Guards: JWT authentication, role-based and self-or-admin access.
- Response Standardization: All responses follow { success, message, data } format.
