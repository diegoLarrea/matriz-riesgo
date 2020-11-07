export class TableMaganer {
    public headers: any = [];
    public params = {
        page: null,
        can: null,
        dir: null,
        by: null,
        filters: null,
        type: null
    };
    public currentHeader: any = 0;


    public init(array: any, sortByInitial, direction) {
        /*
          params: 
          - array: lista de cabeceras de la tabla
          - sortByInitial: posicion de la lista de cabeceras, por la cual se va a ordenar inicialmente
          - direction: ASC/DESC
        */
        for (let i = 0; i < array.length; i++) {
            this.headers.push({
                columnName: array[i].columnName,
                by: array[i].by,
                sort: false,
                dir: "",
                sortable: array[i].by != null,
                center: array[i].center
            });
        }
        this.reset(sortByInitial, direction);
    }

    sortBy(pos) {
        if (this.headers[pos].sortable) {
            let dir: string = "";
            if (this.headers[pos].dir === "") {
                dir = "ASC";
            } else {
                this.headers[pos].dir === "ASC" ? (dir = "DESC") : (dir = "ASC");
            }

            this.headers[this.currentHeader].sort = false;
            this.headers[this.currentHeader].dir = "";

            this.currentHeader = pos;
            this.headers[this.currentHeader].sort = true;
            this.headers[this.currentHeader].dir = dir;

            this.params.dir = this.headers[this.currentHeader].dir;
            this.params.by = this.headers[this.currentHeader].by;
        }
        return true;
    }

    reset(current, direction) {
        this.headers[this.currentHeader].sort = false;
        this.headers[this.currentHeader].dir = "";

        this.currentHeader = current;
        this.headers[this.currentHeader].sort = true;
        this.headers[this.currentHeader].dir = direction;

        this.params.dir = this.headers[this.currentHeader].dir;
        this.params.by = this.headers[this.currentHeader].by;
        this.params.page = 1;
        this.params.can = 10;
        this.params.filters = null;
        this.params.type = "OR";
    }

    setFilters(filters) {
        this.params.filters = filters;
    }
}