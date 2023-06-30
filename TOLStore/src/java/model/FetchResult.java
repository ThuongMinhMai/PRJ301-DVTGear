package model;

import java.util.List;

public class FetchResult<T> {

    private List<T> items;
    private int totalCount;

    public FetchResult(List<T> items, int totalCount) {
        this.items = items;
        this.totalCount = totalCount;
    }

    public List<T> getItems() {
        return items;
    }

    public int getTotalCount() {
        return totalCount;
    }
}
