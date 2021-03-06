class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :venue, index: true, foreign_key: true
      t.string :name
      t.datetime :date
      t.text :description

      t.timestamps null: false
    end
  end
end
