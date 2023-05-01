import pandas as pd

def part1(df: pd.DataFrame):
    max_salary_index = df['SALARY'].idxmax()
    max_salary_employee = df.loc[max_salary_index, ['FIRST_NAME', 'LAST_NAME', 'DEPARTMENT_ID']]
    max_salary_department = df.loc[max_salary_index, 'DEPARTMENT_ID']
    print(f"The highest salary is {df.loc[max_salary_index, 'SALARY']}, given to {max_salary_employee['FIRST_NAME']} {max_salary_employee['LAST_NAME']} in department {max_salary_department}.")

def part2(df: pd.DataFrame):
    # Group the DataFrame by department and find the maximum salary in each group
    max_salaries = df.groupby('DEPARTMENT_ID')['SALARY'].max()
    # Find the department with the highest maximum salary
    highest_max_salary_department = max_salaries.idxmax()
    print(f"The highest maximum salary is {max_salaries.max()}, paid in department {highest_max_salary_department}.")


def part3(df: pd.DataFrame):
    # Group the DataFrame by hire date and find the maximum and minimum salary in each group
    salary_by_hire_date = df.groupby('HIRE_DATE')['SALARY'].agg(['max', 'min'])
    # Print the result
    print(salary_by_hire_date)



def main():
    df = pd.read_csv('./employees.csv')
    part1(df)
    part2(df)
    part3(df)

if __name__ == "__main__":
    main()
