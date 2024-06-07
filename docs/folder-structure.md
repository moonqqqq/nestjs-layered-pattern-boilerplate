Each module will have below files
controller / service / repository / dto

## 1. Controller
Handler for req, res

## 2. Service
Business logic is heare

## 3. Repository
1. Only for database related code. **Not business logic**
2. The functions on repository Shouldn't throw exceptions not to make the limitation usability

## 4. DTO
validation, sanitization, type change, etc..
