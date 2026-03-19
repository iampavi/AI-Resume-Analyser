1. Managed Code vs Unmanaged Code:
2. Assembly in .NET:
3. **IQueryable  \&\&  IEnumerable**:



* **IEnumerable** is used for querying in-memory collections. The query is executed in the application memory after the data is fetched from the database.
* **IQueryable** is used for querying remote data sources like databases. The query is translated into SQL and executed in the database itself.
* In **Entity Framework**, **IQueryable** is preferred because filtering happens at the database level, which improves performance.



4\. Dependency Injection

* D**ependency Injection** is a design pattern used to reduce **tight** **coupling** between classes. Instead of creating objects inside a class, dependencies are provided from outside.

5\. Middleware

* Middleware is a component that handles http request in the application pipeline .
* Middleware is commonly used for logging, authentication, authorization, exception handling, and routing. It is configured in the application pipeline in Program.cs using methods like UseAuthentication, UseAuthorization, and UseRouting.



Difference between interface and abstract:



| Feature      | Interface           | Abstract Class               |

| ------------ | ------------------- | ---------------------------- |

| Methods      | Only declaration    | Declaration + implementation |

| Constructors | Not allowed         | Allowed                      |

| Inheritance  | Multiple interfaces | Single abstract class        |

| Usage        | Define contract     | Provide base functionality   |



