import React from 'react'

class TableHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    toggleSort(key) {
        this.props.onSort(key)
    }

    render() {
        const thItems = this.props.headers.map((d)=> {
            let sortArrow = ''
            if (d === this.props.sortKey) {
                sortArrow = (this.props.sortDir === 1) ? '\u25B2' : '\u25BC'
            }
            return <th key={d} onClick={this.toggleSort.bind(this, d)}>
                {d}{sortArrow}
            </th>
        })
        return <thead>
            <tr>
                {thItems}
            </tr>
        </thead>
    }
}

class TableBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let usersSorted = [...this.props.users]
        if (this.props.sortKey) {
            const key = this.props.sortKey
            usersSorted = usersSorted.sort((a,b)=> {
                let valA = a[key], valB = b[key]

                if (valA < valB) {
                    return -1 * this.props.sortDir
                } 
                else if (valA > valB) {
                    return 1 * this.props.sortDir
                }
                else {
                    return 0
                }
            })
        }
        const rows = usersSorted.map((user)=> {
            const cells = this.props.headers.map((h,i)=> {
                let val = user[h]
                if (h === 'Salary') {
                    val = "$" + val.toLocaleString()
                }
                return <td key={i}>{val}</td>
            })
            return <tr key={user.Name}>
                {cells}
            </tr>
        })
        return <tbody>
            {rows}
        </tbody>
    }
}

export const generateData = ()=> {
    const names = [
        "Luz Curtis",
        "Hazel Higgins",
        "Phil Riley",
        "Hattie Delgado",
        "Corey Thornton",
        "Jerald Fisher",
        "Terrell Snyder",
        "Cassandra Hill",
        "Meredith Owen",
        "Alfredo Miles",
        "Lee Willis",
        "Katherine Logan",
        "Seth Lawrence",
        "Elijah Richardson",
        "Edith Reed",
        "Dustin Barber",
        "Joyce Frank",
        "Heather Elliott",
        "Eunice Mcguire",
        "Alonzo Lewis",
        "Craig Morales",
        "Jessica Meyer",
        "Theodore Poole",
        "Dean Jones",
        "Jeff Ryan"
    ]

    const locations = ['New York', 'Austin', 'San Francisco', 'London', 'Zurich']

    return names.map((name)=> {
        return {
            Name: name,
            Age: Math.ceil(Math.random() * 50 + 18),
            Salary: Math.ceil(Math.random() * 123000 + 40000),
            Location: locations[Math.floor(Math.random() * locations.length)]
        }
    })
}

export class UserGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: props.users,
            sortKey: null,
            sortDir: null
        }
    }

    onSort(sortKey) {
        this.setState((state,props)=> {
            if (state.sortKey === sortKey) {
                if (state.sortDir === 1) {
                    return {sortDir: -1}
                }
                else {
                    return {sortDir: null, sortKey: null}
                }
            }
            else {
                return {sortKey: sortKey, sortDir: 1}
            }
        })
    }

    render() {
        if (!(this.state.users instanceof Array) && this.state.users.length <= 0) {
            return <div>No Users Found</div>
        }

        let headers = []
        for(const key in this.state.users[0]) {
            headers.push(key)
        }

        return <table className='table table-sm'>
            <TableHeader 
                headers={headers} 
                sortKey={this.state.sortKey}
                sortDir={this.state.sortDir}
                onSort={this.onSort.bind(this)} />
            <TableBody 
                users={this.state.users} 
                sortKey={this.state.sortKey}
                sortDir={this.state.sortDir}
                headers={headers} />
        </table>
    }
}