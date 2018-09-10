# Set format to HTML5
Slim::Engine.set_options format: :html, sort_attrs: false, shortcut: {
    '#' => {attr: 'id'},
    '.' => {attr: 'class'},
    '&' => {attr: 'type'},
    '@' => {attr: 'role'},
    '%' => {attr: 'itemprop'},
    '^' => {tag: 'span', additional_attrs: {class: 'material-icon', 'aria-hidden': 'true'}}
}

# Coffee filter
Slim::Embedded.options[:coffee] = {bare: true}
